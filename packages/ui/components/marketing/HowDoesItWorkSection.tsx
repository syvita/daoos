/* This example requires Tailwind CSS v2.0+ */
const content = [
  {
    title: "Get Wallet",
    description:
      "Get the Stacks Wallet browser extension. This is the wallet used by MiamiCoin.",
  },
  {
    title: "Buy Miami Coin",
    description:
      "Get some MiamiCoin. Get it at okcoin.com or by mining (no fancy hardware required).",
  },
  {
    title: "Login to Miami Voice",

    description:
      "Log into Miami Voice account with your wallet. You must have some $MIA in your wallet.",
  },
  {
    title: "Review and Vote",

    description:
      " Review and vote on existing proposals, or create your own proposals.",
  },
];

export default function HowDoesItWorkSection() {
  return (
    <div className=" bg-gradient-to-bl from-blue-100 relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2
            className="text-3xl text-color-gradient
          inline-block uppercase tracking-tight font-extrabold sm:text-4xl"
          >
            How Does It Work
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Vote and create ideas for your city in 4 easy steps
          </p>
        </div>
        <div className="mt-6 max-w-lg mx-auto grid bg-transparent gap-5 lg:grid-cols-4 lg:max-w-none">
          {content.map((content, index) => (
            <div key={content.title} className="flex flex-col overflow-hidden">
              <div className="text-9xl text-center opacity-40  top-30 absolute ">
                <span className="text-color-gradient absolute -inset-x-14  ">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1  p-6 flex z-10 flex-col justify-between">
                <div className="flex-1">
                  <span className="block mt-2">
                    <span className="text-lg font-semibold text-color-gradient">
                      {content.title}
                    </span>
                    <p className="mt-3 text-base text-gray-500">
                      {content.description}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
