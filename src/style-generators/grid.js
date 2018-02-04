const buildGrid = ({
  gutterPx,
  columns,
}) => `
.grid__item {
  box-sizing: border-box;
  padding-right: ${gutterPx}px;
  padding-left: ${gutterPx}px;
  flex: 0 0 calc(100% / ${columns});
  max-width: calc(100% / ${columns});
  margin-bottom: ${gutterPx}px;
}

.grid__item:nth-last-child(-n+${columns}) {
  margin: initial;
}

@supports (display: grid) {
  .grid {
    display: grid;
    grid-gap: ${gutterPx}px;
    grid-template-columns: repeat(${columns}, 1fr);
  }

  .grid {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -${gutterPx}px;
    margin-left: -${gutterPx}px;
  }
}
`;


export default buildGrid;
