@[TOC]
## LazyModule
RocketChip中所有电路模块都是`LazyModule`的子模块。
### BareSubsystem
`BareSubsystem`是所有子系统类层次的根。
`BareSubsystem`在`LazyModule`的基础上混入了`BindingScope`来支持设备树的生成。
#### BaseSubsystem
`BaseSubsystem`是一个尚未添加外设、端口以及核心的基础子系统。
`BaseSubsystem`在`BareSubsystem`的基础上混入了
- `Attachable` 提供了一套标准接口，使得其他东西能够附加到这边
- `HasConfigurablePRCILocations` 这是 PRCI 关联信号的附加点
- `HasConfigurableTLNetworkTopology` 用来查找该层次上TileLink总线的拓扑配置
##### RocketSubsystem
`RocketSubsystem`在`BaseSubsystem`的基础上混入了`HasRocketTiles`
###### ExampleRocketSystem
`ExampleRocketSystem`在`RocketSubsystem`的基础上混入了
- `HasAsyncExtInterrupts` 如果外部中断尚未与外设(PLIC)时钟同步的话，应该使用该模块
- `CanHaveMasterAXI4MemPort` AXI4 DRAM控制器的Master端口
- `CanHaveMasterAXI4MMIOPort` AXI4 MMIO设备总线的Master端口
- `CanHaveSlaveAXI4Port` AXI4总线的Slave端口
- `HasPeripheryBootROM` 增加一个BROM，内含描述该子系统的DTB
## LazyScope
一个可以修饰`LazyModule`的trait，其允许动态的创建模型层级，并将逻辑放进`LazyModule`中。
### LazyScopeWithParameters
引入了参数。这是动态配置的基础。
#### HasLogicalHierarchy
`HasLogicalHierarchy`在`LazyScopeWithParameters`的基础上混入了`HasLogicalTreeNode`。
该trait将层级结构表示为对象模型。
##### HasPRCILocations
该trait为层级结构提供 PRCI 附加点。
###### HasTileLinkLocations
该trait为层级结构提供TileLink接口附加点。
####### Attachable
## HasCoreMonitorBundles
### HasTiles
#### HasRocketTiles
`HasRocketTiles`在`HasTiles`的基础上混入了
- `CanHavePeripheryPLIC`连接 PLIC 到子系统
- `CanHavePeripheryCLINT`连接 CLINT 到子系统
- `HasPeripheryDebug` 连接调试接口到子系统，例如 JTAG DTM，DMI 或是 APB
## Config

*[PRCI]: Power Reset Clock Interrupt
*[PLIC]: Platform-Level Interrupt Controller
*[CLINT]: Core-Local INTerrupts
*[JTAG]: Joint Test Action Group
*[DMI]: Debug Module Interface
*[APB]: Advanced Peripheral Bus