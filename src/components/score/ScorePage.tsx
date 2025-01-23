import {
  Animated,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  BackgroundColor,
  FontColor,
  FontSize,
} from '../../config/globalStyleSheetConfig.ts';
import {SvgXml} from 'react-native-svg';
import XMLResources from '../../basic/XMLResources.ts';
import React, {useEffect, useRef, useState} from 'react';
import {NavigationProps} from '../home/homePage.tsx';
import {MinorScore, SingleScore} from './SingleScore.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
  initMinorScoreList,
  initScoreList,
  selectMinorScoreList,
  selectOverview,
  selectScoreList,
  setCompulsoryScoreOverview,
  setMinorScoreOverview,
  setScoreOverview,
} from '../../app/slice/scoreSlice.ts';
import {useQuery, useRealm} from '@realm/react';
import GongUser from '../../dao/object/User.ts';
import Resources from '../../basic/Resources.ts';
import {ResourceCode} from '../../utils/enum.ts';
import ScalingNotAllowedText from '../global/ScalingNotAllowedText.tsx';
import {AnimatedScrollView} from 'react-native-reanimated/lib/typescript/component/ScrollView';
import {sleep} from '../../utils/globalUtils.ts';
import ScrollView = Animated.ScrollView;

const ScorePage = ({navigation}: NavigationProps) => {
  const dispatch = useAppDispatch();

  const realm = useRealm();
  const user = useQuery<GongUser>('GongUser')[0];

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number>(0);
  const [isCompulsory, setIsCompulsory] = useState<boolean>(false);

  const scrollViewRef = useRef<AnimatedScrollView>(null);

  const scoreList = useAppSelector(selectScoreList);
  const minorScoreList = useAppSelector(selectMinorScoreList);
  const overview = useAppSelector(selectOverview);

  const onRefresh = () => {
    setRefreshing(true);

    if (!user) {
      ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
      setRefreshing(false);
      return;
    }

    const scoreOverviewPromise = new Promise(async (resolve, reject) => {
      const msg = await Resources.getScoreOverview(user.token);
      if (
        msg.code === ResourceCode.Successful ||
        msg.code === ResourceCode.DataExpired
      ) {
        dispatch(setScoreOverview(msg.data));
        realm.write(() => {
          user.scoreOverview = JSON.stringify(msg.data);
        });
        resolve({
          code: msg.code,
          msg: msg.code === 200 ? undefined : '成绩总览数据更新中',
        });
      } else if (msg.code === ResourceCode.InvalidToken) {
        reject('身份失效，请重新登录！');
      } else {
        resolve('成绩总览获取失败');
      }
    });

    const scoreListPromise = new Promise(async (resolve, reject) => {
      const msg = await Resources.getScore(user.token);
      if (
        msg.code === ResourceCode.Successful ||
        msg.code === ResourceCode.DataExpired
      ) {
        dispatch(initScoreList(msg.data));
        realm.write(() => {
          user.scoreList = JSON.stringify(msg.data);
        });
        resolve({
          code: msg.code,
          msg: msg.code === 200 ? undefined : '成绩表单数据更新中',
        });
      } else if (msg.code === ResourceCode.InvalidToken) {
        reject('身份失效，请重新登录！');
      } else {
        resolve({
            code: msg.code,
            msg: '成绩表单获取失败',
        });
      }
    });

    const minorScoreListPromise = new Promise(async (resolve, reject) => {
      const msg = await Resources.getMinorScore(user.token);
      if (
        msg.code === ResourceCode.Successful ||
        msg.code === ResourceCode.DataExpired
      ) {
        dispatch(initMinorScoreList(msg.data.scoreList));
        dispatch(
          setMinorScoreOverview({
            totalCredit: msg.data.totalCredit,
            minorGpa: msg.data.gpa,
            minorAverageScore: msg.data.averageScore,
          }),
        );
        realm.write(() => {
          user.minorScoreList = JSON.stringify(msg.data.scoreList);
          user.minorScoreOverview = JSON.stringify({
            totalCredit: msg.data.totalCredit,
            minorGpa: msg.data.gpa,
            minorAverageScore: msg.data.averageScore,
          });
        });
        resolve({
          code: msg.code,
          msg: msg.code === 200 ? undefined : '辅修表单数据更新中',
        });
      } else if (msg.code === ResourceCode.InvalidToken) {
        reject('身份失效，请重新登录！');
      } else {
        resolve({
            code: msg.code,
            msg: '辅修表单获取失败',
        });
      }
    });

    const compulsoryOverviewPromise = new Promise(async (resolve, reject) => {
      const msg = await Resources.getCompulsoryScoreOverview(user.token);
      if (
        msg.code === ResourceCode.Successful ||
        msg.code === ResourceCode.DataExpired
      ) {
        console.log('compulsoryOverview');
        dispatch(setCompulsoryScoreOverview(msg.data));
        realm.write(() => {
          user.compulsoryScoreOverview = JSON.stringify(msg.data);
        });
        resolve({
          code: msg.code,
          msg: msg.code === 200 ? undefined : '必修成绩总览数据更新中',
        });
      } else if (msg.code === ResourceCode.InvalidToken) {
        reject('身份失效，请重新登录！');
      } else {
        resolve({
            code: msg.code,
            msg: '必修成绩总览获取失败',
        });
      }
    });

    Promise.all([
      scoreOverviewPromise,
      scoreListPromise,
      minorScoreListPromise,
      compulsoryOverviewPromise,
    ])
      .then(async (results: any[]) => {
        let flag = false;
        for (let result of results) {
          if (result.code !== 200) {
            ToastAndroid.showWithGravity(result.msg, 1500, ToastAndroid.BOTTOM);
            flag = true;
            await sleep(1500);
          }
        }

        if (!flag) {
          ToastAndroid.showWithGravity(
            '数据刷新完成',
            1500,
            ToastAndroid.BOTTOM,
          );
        }

        setRefreshing(false);
      })
      .catch((error: string) => {
        ToastAndroid.showWithGravity(error, 1500, ToastAndroid.BOTTOM);
        setRefreshing(false);
      });
  };

  const handleExchange = () => {
    setIsCompulsory(!isCompulsory);
  };

  const handleBack = () => {
    navigation.navigate('TabNavigation');
  };

  useEffect(() => {
    setRefreshing(true);
    onRefresh();
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{flex: 1}}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[BackgroundColor.primary]}
        />
      }>
      <View style={{height: '100%'}}>
        <View style={ss.titleBar}>
          <Pressable
            onPress={handleBack}
            style={ss.backButton}
            hitSlop={{top: 5, bottom: 5, right: 10, left: 10}}>
            <SvgXml xml={XMLResources.backArrow} width={10} height={18} />
          </Pressable>

          <Text style={ss.titleText}>查成绩</Text>
        </View>
        <View style={ss.mainContainer}>
          <View style={ss.totalContainer}>
            {listIndex == 0 ? (
              <Pressable
                hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}
                onPress={handleExchange}
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 10,
                  marginRight: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SvgXml
                  style={{marginRight: 5}}
                  xml={isCompulsory ? XMLResources.exam : XMLResources.notExam}
                  width="12"
                  height="12"
                />
                <ScalingNotAllowedText
                  style={{fontSize: FontSize.s, color: FontColor.grey}}>
                  仅必修
                </ScalingNotAllowedText>
              </Pressable>
            ) : (
              <></>
            )}
            {listIndex === 0 ? (
              isCompulsory ? (
                <View style={ss.overviewContainer}>
                  <ScoreBox
                    score={overview.compulsoryOverview.gpa}
                    text={'必修绩点'}
                  />
                  <ScoreBox
                    score={overview.compulsoryOverview.classRank}
                    text={'班级排名'}
                  />
                  <ScoreBox
                    score={overview.compulsoryOverview.majorRank}
                    text={'年级排名'}
                  />
                  <ScoreBox
                    score={overview.compulsoryOverview.averageScore}
                    text={'平均成绩'}
                  />
                </View>
              ) : (
                <View style={ss.overviewContainer}>
                  <ScoreBox
                    score={overview.wholeOverview.gpa}
                    text={'平均绩点'}
                  />
                  <ScoreBox
                    score={overview.wholeOverview.classRank}
                    text={'班级排名'}
                  />
                  <ScoreBox
                    score={overview.wholeOverview.majorRank}
                    text={'年级排名'}
                  />
                  <ScoreBox
                    score={overview.wholeOverview.averageScore}
                    text={'平均成绩'}
                  />
                </View>
              )
            ) : (
              <View style={ss.overviewContainer}>
                <ScoreBox
                  score={overview.minorOverview.gpa}
                  text={'平均绩点'}
                />
                <ScoreBox
                  score={overview.minorOverview.totalCredit}
                  text={'总学分'}
                />
                <ScoreBox
                  score={overview.minorOverview.credit}
                  text={'已修学分'}
                />
                <ScoreBox
                  score={overview.minorOverview.averageScore}
                  text={'平均成绩'}
                />
              </View>
            )}
          </View>
          <View style={ss.buttonContainer}>
            <Pressable
              hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}
              onPress={() => {
                if (listIndex !== 0) setListIndex(0);
              }}>
              <ScalingNotAllowedText
                style={{
                  color: listIndex === 0 ? FontColor.dark : FontColor.grey,
                }}>
                主修
              </ScalingNotAllowedText>
            </Pressable>
            <Pressable
              hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}
              onPress={() => {
                if (listIndex !== 1) setListIndex(1);
              }}>
              <ScalingNotAllowedText
                style={{
                  color: listIndex === 1 ? FontColor.dark : FontColor.grey,
                }}>
                辅修
              </ScalingNotAllowedText>
            </Pressable>
          </View>
          <ScrollView
            style={[
              ss.scoreListContainer,
              {display: listIndex === 0 ? 'flex' : 'none'},
            ]}
            nestedScrollEnabled={true}>
            {scoreList.map((singleScore, index) => {
              return (
                <SingleScore
                  scoreList={singleScore}
                  term={singleScore.term}
                  key={index}
                />
              );
            })}
          </ScrollView>
          <ScrollView
            style={[
              ss.scoreListContainer,
              {display: listIndex === 1 ? 'flex' : 'none'},
            ]}
            nestedScrollEnabled={true}>
            {minorScoreList.map((singleScore, index) => {
              return (
                <MinorScore
                  scoreList={singleScore}
                  term={singleScore.term}
                  key={index}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * 总概中的单个内容框
 * @param score 对应分数
 * @param text 底部文字
 * @constructor
 */
const ScoreBox = ({score, text}: { score: number, text: string }) => {
    const currentScore = score === -1 ? '--' : score;

    return (
        <View style={ss.scoreBoxContainer}>
            <Text style={{color: FontColor.primary, fontSize: FontSize.xxl, fontWeight: '400'}}>{currentScore}</Text>
            <Text style={{color: FontColor.dark, fontSize: FontSize.xxs}}>{text}</Text>
        </View>
    )

}

const ss = StyleSheet.create({
    titleBar: {
        width: '100%',
        height: 140,
        paddingTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    backButton: {
        height: 24,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
    },

    titleText: {
        fontSize: FontSize.ll,
        color: FontColor.light,
        fontWeight: '600',
    },

    mainContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{translateY: -20}],
    },

    totalContainer: {
        width: '86%',
        height: 90,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    overviewContainer: {
        width: '100%',
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    scoreBoxContainer: {
        width: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    scoreListContainer: {
        width: '86%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
    },

    buttonContainer: {
        width: '86%',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})

export default ScorePage;
