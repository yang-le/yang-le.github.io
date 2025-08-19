# GRPO

参考
- https://github.com/huggingface/course/blob/main/chapters/en/chapter12/3a.mdx
- https://github.com/aburkov/theLMbook/blob/main/GRPO_From_Scratch_Multi_GPU_DataParallel_Qwen_2_5_1_5B_Instruct.ipynb

![](https://github.com/huggingface/course/raw/main/chapters/en/chapter12/img/2.jpg)

## 算法

### 步骤一：分组采样

为每个问题生成多个可能的回答。

对每个问题$q$，模型将生成$G$个输出$\{o_1, o_2, \dots, o_G\}$。

#### 例子：

- 问题$q$: 计算$2 + 2 \times 6$
- 输出（$G = 8$）: $o_1$：14（正确）， $o_2$: 16（错误），$o_3$: 10（错误）， ... ，$o_8$: 14（正确）

### 步骤二：优势计算

为每个生成的输出赋予一个奖励分值$r_i$，例如若回答正确得1分，回答错误得0分。然后按照如下公式计算优势值
$$A_i = \frac{r_i - \mathrm{mean}(r_1, r_2, \dots, r_G)}{\mathrm{std}(r_1, r_2, \dots, r_G)}$$

#### 例子：

继续上面的例子，假设8个回答中有4个正确，4个错误，则容易算出
- 组均值：$\mathrm{mean}(r_i) = 0.5$
- 组标准差：$\mathrm{std}(r_i) = 0.53$
- 优势值：
    - 正确回答：$A_i = \frac{1 - 0.5}{0.53} = 0.94$
    - 错误回答：$A_i = \frac{0 - 0.5}{0.53} = -0.94$

### 步骤三：策略更新

目标函数为：
$$J_\text{GRPO}(\theta) = \frac{1}{G}\sum_{i = 1}^G\left[\min\left(\frac{\pi_\theta(o_i | q)}{\pi_{\theta_\text{old}}(o_i | q)}A_i, \mathrm{clip}\left(\frac{\pi_\theta(o_i | q)}{\pi_{\theta_\text{old}}(o_i | q)}, 1 - \epsilon, 1 + \epsilon\right)A_i\right)\right] - \beta D_\text{KL}(\pi_\theta || \pi_\text{ref})$$

## 目标函数详解

### 1. 概率比

$$\frac{\pi_\theta(o_i | q)}{\pi_{\theta_\text{old}}(o_i | q)}$$

其中$\pi_\theta(o_i | q)$是当输入为$q$时策略$\pi_\theta$给出输出$o_i$的概率。
- 若该比值大于1，则新的模型（相较旧的模型来说）会赋予$o_i$更高的概率
- 若该比值小于1，则新的模型会赋予$o_i$更低的概率

### 2. 裁切函数

$$\mathrm{clip}\left(\frac{\pi_\theta(o_i | q)}{\pi_{\theta_\text{old}}(o_i | q)}, 1 - \epsilon, 1 + \epsilon\right)$$

裁切函数限制上面提到的概率比在$[1 - \epsilon, 1 + \epsilon]$之间，主要目的是为了限制每次策略更新的幅度使得训练保持稳定。

### 3. KL散度

$$\beta D_\text{KL}(\pi_\theta || \pi_\text{ref})$$

这项的目的是为了防止新模型$\pi_\theta$与参考模型$\pi_\text{ref}$偏差太远。参数$\beta$用来控制惩罚力度，较高的$\beta$值限制策略更新，强制新模型与参考模型保持一致；较低的$\beta$值鼓励新模型探索其他答案，但可能导致无意义的输出。 DeepSeekMath的原始论文中设置$\beta = 0.04$。
