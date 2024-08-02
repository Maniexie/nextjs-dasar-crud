import AccordionLayouts from "@/components/AccordionLayouts";

const ProductLayout = ({ children }) => {
  return (
    <>
      {/* <AccordionLayouts title="Product Layout">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non asperiores
        optio eum explicabo! Expedita, molestias? Aspernatur suscipit velit
        deserunt vero.
      </AccordionLayouts>
      <h1>Product Layout dari lay out</h1> */}
      <section>{children}</section>
    </>
  );
};

export default ProductLayout;
