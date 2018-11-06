module.exports = (currentPageName, linkUrl) => (`./${currentPageName}` === linkUrl ? 'current' : '');
