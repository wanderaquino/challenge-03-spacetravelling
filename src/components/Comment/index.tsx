export default function Comment() {
 return (      
 <section
    ref={elem => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.crossOrigin = "anonymous";
      scriptElem.setAttribute("repo", "wanderaquino/challenge-03-spacetravelling");
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("label", "post-comment");
      scriptElem.setAttribute("theme", "github-dark");
      elem.appendChild(scriptElem);
    }}
  />)   
}