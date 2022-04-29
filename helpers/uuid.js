module.exports = () => {
  const s1 = Math.floor((1 + Math.random()) * 0x10000000).toString(16);
  const s2 = Math.floor((1 + Math.random()) * 0x1000).toString(16);
  const s3 = Math.floor((1 + Math.random()) * 0x1000).toString(16);
  const s4 = Math.floor((1 + Math.random()) * 0x1000).toString(16);
  const s5 = Math.floor((1 + Math.random()) * 0x100000000000).toString(16);
  return `${s1}-${s2}-${s3}-${s4}-${s5}`;
};
