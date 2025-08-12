module.exports = {
  testEnvironment: 'jsdom', //Simulates a browser environment so your React components can render as if in a real browser.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],//Makes Jest understand imports of CSS or style files, which Next.js uses, but Jest doesn't natively understand. This avoids errors when your components import CSS.


  moduleNameMapper: {//Makes Jest understand imports of CSS or style files, which Next.js uses, but Jest doesn't natively understand. This avoids errors when your components import CSS.

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
