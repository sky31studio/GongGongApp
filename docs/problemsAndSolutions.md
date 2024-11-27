# 问题答疑

## react-native-gesture-handler

ScrollView和RNGH的pan等手势会冲突。在该项目的HomePage的AgendaComponent中，需要写一个类似于QQ可以左右滑动呼出
功能模块，同时又可以垂直滚动的列表。  
起初准备使用Pan手势手搓一个类似的效果，但是尝试后无果，触发pan手势后，无论是在onBegin还是在onUpdate回调函数中都无法
触发滚动。之后发现RNGH官方提供了一个叫Swipeable的组件，该组件可以在提供水平滚动的情况下，又能防止其屏蔽外层ScrollView
的垂直滚动(触发垂直滚动则不触发水平，同理水平滚动)，踩雷。

## newArch=true引起react-native-pager-view错误

## realm-js
该项目在发现上一个问题前，使用的是react-native-mmkv作为数据持久化方案，但是因为mmkv的使用必须打开
newArch=true才可以，因此使用realm-js作为数据存储的替代方案。

> [!NOTE]
>
> 如果修改、添加或删除了schema的一些字段，realm是需要进行迁移的，但是我们在开发环境可能不想要总是手动进行迁移，所以我们可以设置deleteRealmIfMigrationNeeded为true，即自动删除数据库。
>
> 切勿将deleteRealmIfMigrationNeeded设置为true的情况下发布到应用环境。


## text out of Text component
明明只要是文本的都放在Text中，为什么还是会报错？  
建议将 {visible && <View></View>}这样的写法替换成{visible ? <View></View> : null}
