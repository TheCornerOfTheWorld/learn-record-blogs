# Theme - Team Page

## Show team members in a page

您可以使用从 vitebress/theme 公开的`<VPTeamMembers>`组件在任何页面上显示团队成员列表。html 格式

## Create a full Team Page

您可以创建一个完整的团队页面，而不是将团队成员添加到文档页面，这与您创建自定义主页的方式类似。要创建团队页面，首先创建一个新的 md 文件。文件名不重要，但在这里我们将其称为 team.md。在此文件中，设置 frontmatter 选项 layout:page，然后可以使用 TeamPage 组件组成页面结构。
创建完整的团队页面时，请记住使用`<VPTeamPage>`组件包装所有组件。此组件将确保所有嵌套的与团队相关的组件都获得适当的布局结构，如间距`<VPPageTitle>`组件添加页面标题部分。标题为`<h1>`标题。使用#title 和#lead-slot 记录您的团队`<VPMembers>`的工作原理与在文档页面中使用时相同。它将显示成员列表。
添加分区以划分团队成员。
您可以在团队页面中添加“部分”。例如，您可能有不同类型的团队成员，如核心团队成员和社区合作伙伴。您可以将这些成员划分为多个部分，以更好地解释每个组的角色。为此，请将`<VPTeamPageSection>`组件添加到我们之前创建的 team.md 文件中。

## `<VPTeamMembers>`

`<VPTeamMembers>`组件显示给定的成员列表。

## `<VPTeamPage>`

创建完整团队页面时的根组件。它只接受一个插槽。它将为所有传入的团队相关组件设置样式。

## `＜VPTeamPageTitle>`

添加页面的“标题”部分。最好在`<VPTeamPage>`下开始使用。它接受#title 和#lead-slot。

## `<VPTeamPageSection>`

在团队页面中创建一个“section”。它接受#title、#lead 和#memberslot。您可以在`<VPTeamPage>`中添加任意数量的分区。
