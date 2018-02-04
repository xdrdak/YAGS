const mq = width => style => `
@media (min-width: ${width}px) { 
  ${style}
}
`;

export default mq;
