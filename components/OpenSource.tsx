import { ArrowLeft, ArrowUpRight, GitMerge, GitPullRequest } from "lucide-react";
import { contributions, contributionProjects, spoonPosts, spoonFeatureSource, type Contribution } from "../data/contributions";

function ContributionRow({ contribution, detailed = false }: { contribution: Contribution; detailed?: boolean }) {
  return <article className="contribution-row">
    <div className="contribution-project"><span className="eyebrow">{contribution.area}</span><h3>{contribution.project}</h3><span className="merge-status"><GitMerge size={13}/> Merged</span></div>
    <div className="contribution-description"><h4>{contribution.title}</h4><p>{contribution.summary}</p>{detailed && <p className="contribution-date">Merged <time dateTime={contribution.mergedAt}>{new Date(contribution.mergedAt + "T12:00:00Z").toLocaleDateString("en-GB", {day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</time></p>}</div>
    <a className="contribution-evidence" href={contribution.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${contribution.project} pull request ${contribution.number}`}>PR #{contribution.number}<ArrowUpRight size={17}/></a>
  </article>;
}

function SpoonSpotlight() {
  return <aside className="spoon-spotlight" aria-labelledby="spoon-heading"><div><span className="eyebrow">Community spotlight / SpoonOS</span><h3 id="spoon-heading">A skill, shared.<br/><em>A community, building.</em></h3></div><div><p>SpoonOS featured my AI agent skill in its community showcase, crediting the work to Vinayak. Explore the original posts and the merged submission.</p><div className="spotlight-links">{spoonPosts.map(post => <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer">{post.label}<ArrowUpRight size={15}/></a>)}<a href="https://github.com/XSpoonAi/spoon-awesome-skill/pull/22" target="_blank" rel="noopener noreferrer">Merged contribution<ArrowUpRight size={15}/></a><a href={spoonFeatureSource} target="_blank" rel="noopener noreferrer">Official feature on LinkedIn<ArrowUpRight size={15}/></a></div></div></aside>;
}

export function OpenSourceSection() {
  return <section className="open-source-section shell" id="open-source" aria-labelledby="open-source-heading"><div className="section-heading"><p className="eyebrow">02 / Contributing code</p><h2 id="open-source-heading">Open source.<br/><em>Shared progress.</em></h2><p>Improvements I’ve contributed to software maintained by other teams. Each link shows the code change they accepted and merged.</p></div><div className="contribution-summary"><span><GitPullRequest size={17}/><strong>{contributions.length}</strong> selected merged PRs</span><span><strong>{contributionProjects}</strong> upstream projects</span><span>Python · JavaScript · AI</span></div><div>{contributions.slice(0,3).map(contribution => <ContributionRow key={contribution.id} contribution={contribution}/>)}</div><a className="text-link all-contributions" href="/open-source/">Explore all selected contributions<ArrowUpRight size={17}/></a><SpoonSpotlight/></section>;
}

export function OpenSourcePage() {
  return <article className="open-source-page"><header className="case-header shell"><a className="back-link" href="/#open-source"><ArrowLeft size={16}/> Back to the portfolio</a><p className="eyebrow">Open source / Selected upstream contributions</p><h1>Small fixes.<br/><em>Shared progress.</em></h1><p className="case-subtitle">From security probes to better developer tools.</p><div className="case-intro"><p>These are contributions to projects maintained by other teams. The pull requests below were authored by Vinayak19112003 and merged upstream. Merge status was checked on 14 October 2026.</p></div><div className="contribution-summary"><span><GitPullRequest size={17}/><strong>{contributions.length}</strong> selected merged PRs</span><span><strong>{contributionProjects}</strong> upstream projects</span><span>Code · Regression tests · Documentation</span></div></header><div className="shell contribution-index">{contributions.map(contribution => <ContributionRow key={contribution.id} contribution={contribution} detailed/>)}<SpoonSpotlight/><a className="text-link" href="/#contact">Let’s build something useful<ArrowUpRight size={17}/></a></div></article>;
}
