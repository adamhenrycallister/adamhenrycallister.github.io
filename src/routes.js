const routes = [
  { title: "Contents", path: "/black_scholes", component: "BS0", group: "BS" },
  { title: "Preliminaries", path: "/black_scholes/preliminaries", component: "BS1", group: "BS"  },
  { title: "Stochastic Calculus", path: "/black_scholes/stochastic_calculus", component: "BS2", group: "BS"  },
  { title: "Black-Scholes Equation", path: "/black_scholes/equation", component: "BS3", group: "BS"  },
  { title: "Black-Scholes Transformation", path: "/black_scholes/transformation", component: "BS4", group: "BS"  },
  { title: "Pricing a Call", path: "/black_scholes/pricing", component: "BS5", group: "BS"  },
  { title: "Comparative Statics", path: "/black_scholes/statics", component: "BS6", group: "BS"  },
  { title: "Calculator/Graph", path: "/black_scholes/calculator_graph", component: "BS7", group: "BS"  },
  { title: "Contents", path: "/time_discounting", component: "TD0", group: "TD"  },
  { title: "Intro", path: "/time_discounting/intro", component: "TD1", group: "TD"  },
  { title: "Compound Interest", path: "/time_discounting/compound_interest", component: "TD2", group: "TD"  },
  { title: "Annuities", path: "/time_discounting/annuities", component: "TD3", group: "TD"  },
  { title: "Bonds", path: "/time_discounting/bonds", component: "TD4", group: "TD"  },
  { title: "Contents", path: "/risk", component: "Risk0", group: "Risk"  },
  { title: "Intro", path: "/risk/intro", component: "Risk1", group: "Risk"  },
  { title: "Risk Aversion", path: "/risk/risk_aversion", component: "Risk2", group: "Risk"  },
];

export default routes;