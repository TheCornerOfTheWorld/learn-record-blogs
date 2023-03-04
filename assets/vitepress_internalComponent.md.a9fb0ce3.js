import{_ as e,o as a,c as t,a as r}from"./app.5bb8cff5.js";const P=JSON.parse('{"title":"Theme - Team Page","description":"","frontmatter":{},"headers":[{"level":2,"title":"Show team members in a page","slug":"show-team-members-in-a-page","link":"#show-team-members-in-a-page","children":[]},{"level":2,"title":"Create a full Team Page","slug":"create-a-full-team-page","link":"#create-a-full-team-page","children":[]},{"level":2,"title":"<VPTeamMembers>","slug":"vpteammembers","link":"#vpteammembers","children":[]},{"level":2,"title":"<VPTeamPage>","slug":"vpteampage","link":"#vpteampage","children":[]},{"level":2,"title":"＜ VPTeamPageTitle>","slug":"vpteampagetitle","link":"#vpteampagetitle","children":[]},{"level":2,"title":"<VPTeamPageSection>","slug":"vpteampagesection","link":"#vpteampagesection","children":[]}],"relativePath":"vitepress/internalComponent.md"}'),m={name:"vitepress/internalComponent.md"},l=r('<h1 id="theme-team-page" tabindex="-1">Theme - Team Page <a class="header-anchor" href="#theme-team-page" aria-hidden="true">#</a></h1><h2 id="show-team-members-in-a-page" tabindex="-1">Show team members in a page <a class="header-anchor" href="#show-team-members-in-a-page" aria-hidden="true">#</a></h2><p>您可以使用从 vitebress/theme 公开的<code>&lt;VPTeamMembers&gt;</code>组件在任何页面上显示团队成员列表。￼html 格式</p><h2 id="create-a-full-team-page" tabindex="-1">Create a full Team Page <a class="header-anchor" href="#create-a-full-team-page" aria-hidden="true">#</a></h2><p>您可以创建一个完整的团队页面，而不是将团队成员添加到文档页面，这与您创建自定义主页的方式类似。要创建团队页面，首先创建一个新的 md 文件。文件名不重要，但在这里我们将其称为 <a href="http://team.md" target="_blank" rel="noreferrer">team.md</a>。在此文件中，设置 frontmatter 选项 layout:page，然后可以使用 TeamPage 组件组成页面结构。 创建完整的团队页面时，请记住使用<code>&lt;VPTeamPage&gt;</code>组件包装所有组件。此组件将确保所有嵌套的与团队相关的组件都获得适当的布局结构，如间距<code>&lt;VPPageTitle&gt;</code>组件添加页面标题部分。标题为<code>&lt;h1&gt;</code>标题。使用#title 和#lead-slot 记录您的团队<code>&lt;VPMembers&gt;</code>的工作原理与在文档页面中使用时相同。它将显示成员列表。 添加分区以划分团队成员。 您可以在团队页面中添加“部分”。例如，您可能有不同类型的团队成员，如核心团队成员和社区合作伙伴。您可以将这些成员划分为多个部分，以更好地解释每个组的角色。为此，请将<code>&lt;VPTeamPageSection&gt;</code>组件添加到我们之前创建的 <a href="http://team.md" target="_blank" rel="noreferrer">team.md</a> 文件中。</p><h2 id="vpteammembers" tabindex="-1"><code>&lt;VPTeamMembers&gt;</code> <a class="header-anchor" href="#vpteammembers" aria-hidden="true">#</a></h2><p><code>&lt;VPTeamMembers&gt;</code>组件显示给定的成员列表。</p><h2 id="vpteampage" tabindex="-1"><code>&lt;VPTeamPage&gt;</code> <a class="header-anchor" href="#vpteampage" aria-hidden="true">#</a></h2><p>创建完整团队页面时的根组件。它只接受一个插槽。它将为所有传入的团队相关组件设置样式。</p><h2 id="vpteampagetitle" tabindex="-1"><code>＜ VPTeamPageTitle&gt;</code> <a class="header-anchor" href="#vpteampagetitle" aria-hidden="true">#</a></h2><p>添加页面的“标题”部分。最好在<code>&lt;VPTeamPage&gt;</code>下开始使用。它接受#title 和#lead-slot。</p><h2 id="vpteampagesection" tabindex="-1"><code>&lt;VPTeamPageSection&gt;</code> <a class="header-anchor" href="#vpteampagesection" aria-hidden="true">#</a></h2><p>在团队页面中创建一个“section”。它接受#title、#lead 和#memberslot。您可以在<code>&lt;VPTeamPage&gt;</code>中添加任意数量的分区。</p>',13),i=[l];function d(n,o,c,s,p,h){return a(),t("div",null,i)}const T=e(m,[["render",d]]);export{P as __pageData,T as default};
