export function DemoSection() {
  return (
    <section className="bg-green-900 py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold max-w-2xl mx-auto mb-8">
          But wait... you don&apos;t know how to use half the tools I just
          mentioned?
        </h2>

        <h3 className="text-2xl mb-8 max-w-2xl mx-auto">
          Don&apos;t worry, I have experience making over 600 tutorial videos on
          youtube and this starter kit includes documentation and video
          walkthroughs. I&apos;ll teach you how to:
        </h3>

        <ul className="text-xl flex flex-col justify-center items-center gap-4 list-disc mb-12">
          <li>how to run the app locally</li>
          <li>how to navigate the codebase</li>
          <li>how to deploy your application</li>
          <li>how to setup the third party services</li>
          <li>how to register and setup a domain</li>
          <li>how to monitor your production application</li>
          <li>how to add new features</li>
          <li>and more!</li>
        </ul>

        <div className="max-w-2xl mx-auto">
          <iframe
            className="w-full h-[500px] rounded-xl"
            src="https://www.youtube.com/embed/-lNpF0ACe1Y?si=nUyS2-DCZCw2qj1Z"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
