import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  MinusIcon,
  AddIcon,
} from "@chakra-ui/react";

const AccordionLayout = (props) => {
  const { children, title } = props;
  return (
    <Accordion defaultIndex={[0]} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionLayout;
