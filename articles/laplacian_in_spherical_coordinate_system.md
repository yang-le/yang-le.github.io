@[toc](拉普拉斯算子的球坐标形式)

# 拉普拉斯算子的球坐标形式

球坐标与笛卡尔坐标的转换关系为:

$$\left\{ \begin {aligned}
x &= r\sin\theta\cos\varphi \\
y & = r\sin\theta\sin\varphi \\
z &= r\cos\theta
\end{aligned}\right .$$

$$\left\{ \begin {aligned}
r &= \sqrt{x^2 + y^2 + z^2} \\
\theta &= \arccos\frac{z}{\sqrt{x^2 + y^2 + z^2}} \\
\varphi &= \arctan\frac{y}{x}
\end{aligned}\right .$$

 -   |$\partial r$ | $\partial \theta$ | $\partial \varphi$
-------- |-------- | -----| -----
$\partial x$  | $\sin\theta\cos\varphi$| $\frac{\cos\theta\cos\varphi}{r}$ | $\frac{-\sin\varphi}{r\sin\theta}$
$\partial y$  | $\sin\theta\sin\varphi$ | $\frac{\cos\theta\sin\varphi}{r}$  | $\frac{\cos\varphi}{r\sin\theta}$
$\partial z$  | $\cos\theta$ | $\frac{-\sin\theta}{r}$ | $0$

根据微分形式不变性
$$\frac{\partial}{\partial x} = \frac{\partial}{\partial r}\frac{\partial r}{\partial x} + \frac{\partial}{\partial \theta}\frac{\partial \theta}{\partial x} + \frac{\partial}{\partial \varphi}\frac{\partial \varphi}{\partial x}$$

依上表就有
$$\left\{ \begin {aligned}
\frac{\partial}{\partial x} &= \sin\theta\cos\varphi\frac{\partial}{\partial r} + \frac{\cos\theta\cos\varphi}{r}\frac{\partial}{\partial\theta} + \frac{-\sin\varphi}{r\sin\theta}\frac{\partial}{\partial\varphi} \\
\frac{\partial}{\partial y} &= \sin\theta\sin\varphi\frac{\partial}{\partial r} + \frac{\cos\theta\sin\varphi}{r}\frac{\partial}{\partial\theta} + \frac{\cos\varphi}{r\sin\theta}\frac{\partial}{\partial\varphi} \\
\frac{\partial}{\partial z} &= \cos\theta\frac{\partial}{\partial r} + \frac{-\sin\theta}{r}\frac{\partial}{\partial\theta}
\end{aligned}\right .$$

又
$$\frac{\partial^2}{\partial x^2} = \frac{\partial}{\partial r}(\frac{\partial}{\partial x})\frac{\partial r}{\partial x} + \frac{\partial}{\partial \theta}(\frac{\partial}{\partial x})\frac{\partial \theta}{\partial x} + \frac{\partial}{\partial \varphi}(\frac{\partial}{\partial x})\frac{\partial \varphi}{\partial x}$$

代入相关表达式得

 -   |$\frac{\partial}{\partial x}\frac{\partial r}{\partial x}$ | $\frac{\partial}{\partial y}\frac{\partial r}{\partial y}$ | $\frac{\partial}{\partial z}\frac{\partial r}{\partial z}$ | $\sum$
-------- |-------- | -----| -----| -----
$\frac{\partial}{\partial r}$  | $[\sin\theta\cos\varphi\frac{\partial^2}{\partial r^2} + \frac{-\cos\theta\cos\varphi}{r^2}\frac{\partial}{\partial \theta} + \frac{\sin\varphi}{r^2\sin\theta}\frac{\partial}{\partial \varphi}]\sin\theta\cos\varphi$| $[\sin\theta\sin\varphi\frac{\partial^2}{\partial r^2} + \frac{-\cos\theta\sin\varphi}{r^2}\frac{\partial}{\partial \theta} + \frac{-\cos\varphi}{r^2\sin\theta}\frac{\partial}{\partial \varphi}]\sin\theta\sin\varphi$ | $[\cos\theta\frac{\partial^2}{\partial r^2} + \frac{\sin\theta}{r^2}\frac{\partial}{\partial \theta}]\cos\theta$ | $\frac{\partial^2}{\partial r^2}$
$\frac{\partial}{\partial \theta}$  | $[\cos\theta\cos\varphi\frac{\partial}{\partial r} + \frac{\cos\varphi}{r}(\cos\theta\frac{\partial^2}{\partial\theta^2} - \sin\theta\frac{\partial}{\partial\theta}) + \frac{\sin\varphi\cos\theta}{r\sin^2\theta}\frac{\partial}{\partial \varphi}]\frac{\cos\theta\cos\varphi}{r}$ | $[\cos\theta\sin\varphi\frac{\partial}{\partial r} + \frac{\sin\varphi}{r}(\cos\theta\frac{\partial^2}{\partial\theta^2} - \sin\theta\frac{\partial}{\partial\theta}) + \frac{-\cos\varphi\cos\theta}{r\sin^2\theta}\frac{\partial}{\partial \varphi}]\frac{\cos\theta\sin\varphi}{r}$  | $[\sin\theta\frac{\partial}{\partial r} + \frac{1}{r}(\sin\theta\frac{\partial^2}{\partial\theta^2} + \cos\theta\frac{\partial}{\partial\theta})]\frac{\sin\theta}{r}$ | $\frac{1}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2}$
$\frac{\partial}{\partial \varphi}$  | $[\sin\theta\sin\varphi\frac{\partial}{\partial r} + \frac{\cos\theta\sin\varphi}{r}\frac{\partial}{\partial \theta} + \frac{1}{r\sin\theta}(\sin\varphi\frac{\partial^2}{\partial\varphi^2} + \cos\varphi\frac{\partial}{\partial\varphi})]\frac{\sin\varphi}{r\sin\theta}$ | $[\sin\theta\cos\varphi\frac{\partial}{\partial r} + \frac{\cos\theta\cos\varphi}{r}\frac{\partial}{\partial \theta} + \frac{1}{r\sin\theta}(\cos\varphi\frac{\partial^2}{\partial\varphi^2} - \sin\varphi\frac{\partial}{\partial\varphi})\frac{\cos\varphi}{r\sin\theta}$ | $0$ | $\frac{1}{r}\frac{\partial}{\partial r} + \frac{\cos\theta}{r^2\sin\theta}\frac{\partial}{\partial\theta} + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}$

对上表最后一列再次求和并修改一下形式，最终就可以得到

$$\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} = \frac{1}{r^2}\frac{\partial}{\partial r}(r^2\frac{\partial}{\partial r}) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\frac{\partial}{\partial \theta}) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}$$