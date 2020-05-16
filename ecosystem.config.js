module.exports = [
  {
    script: "index.js",
    name: "nolaborables",
    exec_mode: "cluster",
    instances: 1,
    env: {
      NODE_PATH: ".",
      PORT: 8080,
    },
  },
];
