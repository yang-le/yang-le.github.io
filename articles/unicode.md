# 历史

# 结构

UNICODE为4字节的一个字符编码空间，目的是把全世界所有文字字符收录到统一的框架下。这也许是UNICODE中UNI一词的由来。

截至2016年6月，UNICODE发布了9.0版本，共收录字符128237个。为了对这么多的字符进行有效的分类，UNICODE引入了字符平面的概念。

UNICODE中，每65536（$2^{16}$）个字符为一组，称为一个平面(Plane)。目前的UNICODE空间共有17个平面，如下表所示

  平面                  |范围                   |名称                |英文                                  |缩写
  --------------------- |---------------------- |------------------- |------------------------------------- |-------
  0号平面               |U+0000 -- U+FFFF       |基本多文种平面      |Basic Multilingual Plane              |BMP
  1号平面               |U+10000 -- U+1FFFF     |多文种补充平面      |Supplementary Multilingual Plane      |SMP
  2号平面               |U+20000 -- U+2FFFF     |表意文字补充平面    |Supplementary Ideographic Plane       |SIP
  3号平面               |U+30000 -- U+3FFFF     |表意文字第三平面    |Tertiary Ideographic Plane            |TIP
  4号平面 至 13号平面   |U+40000 -- U+DFFFF     |（尚未使用）        |                                      |
  14号平面              |U+E0000 -- U+EFFFF     |特别用途补充平面    |Supplementary Special-purpose Plane   |SSP
  15号平面              |U+F0000 -- U+FFFFF     |私人使用区（A区）   |Private Use Area-A                    |PUA-A
  16号平面              |U+100000 -- U+10FFFF   |私人使用区（B区）   |Private Use Area-B                    |PUA-B

## 基本多文种平面

  范围           |名称                      |英文
  -------------- |------------------------- |------------------------------------
  3400 -- 4DBF   |中日韩统一表意文字扩展A   |CJK Unified Ideographs Extension A
  4DC0 -- 4DFF   |易经六十四卦              |Yijing Hexagrams Symbols
  4E00 -- 9FFF   |中日韩统一表意文字        |CJK Unified Ideographs
  F900 -- FAFF   |中日韩兼容表意文字        |CJK Compatibility Ideographs

## 多文种补充平面

## 表意文字补充平面

  范围             |名称                      |英文                                      |备注
  ---------------- |------------------------- |----------------------------------------- |--------
  20000 -- 2A6DF   |中日韩统一表意文字扩展B   |CJK Unified Ideographs Extension B        |
  2A700 -- 2B73F   |中日韩统一表意文字扩展C   |CJK Unified Ideographs Extension C        |
  2B740 -- 2B81F   |中日韩统一表意文字扩展D   |CJK Unified Ideographs Extension D        |
  2B820 -- 2CEAF   |中日韩统一表意文字扩展E   |CJK Unified Ideographs Extension E        |
  2CEB0 -- 2EBEF   |中日韩统一表意文字扩展F   |CJK Unified Ideographs Extension F        |计划中
  2F800 -- 2FA1F   |中日韩兼容表意文字增补    |CJK Compatibility Ideographs Supplement   |

## 表意文字第三平面

  范围             |名称     |英文                 |备注
  ---------------- |-------- |-------------------- |--------
  30000 -- 3291F   |小篆     |Small Seal Script    |计划中
  32A00 -- 341FF   |甲骨文   |Oracle Bone Script   |计划中
