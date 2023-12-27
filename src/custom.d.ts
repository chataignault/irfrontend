// declare module "*.svg" {
//     const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//     export default content;
//   }

declare module "*.svg" {
  const value: any;
  export default value;
}
