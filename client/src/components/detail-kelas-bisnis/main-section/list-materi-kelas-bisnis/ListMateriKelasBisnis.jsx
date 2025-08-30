import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { icon } from "../../../../constants";

function ListMateriKelasBisnis({ dataDetail }) {
  return (
    <div className="w-full  gap-[24px] flex flex-col items-start ">
      <h1 className="text-[24px] font-bold leading-[36px]">
        Materi yang Akan Dipelajari
      </h1>

      <Accordion defaultIndex={[0]} allowMultiple className=" w-full ">
        {dataDetail?.kelas_materis?.map((el, index) => {
          return (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    className="flex items-center gap-[12px] w-full text-[16px] md:text-[18px] font-medium leading-[24px] lg:leading-[28px] text-black400 "
                  >
                    <img
                      src={icon.playOutLine}
                      alt="play"
                      className="w-[24px] h-[24px] "
                    />
                    <p> {el.materi}</p>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <div className="w-full flex flex-col items-center">
                  {el.link ? (
                    <iframe
                      width="560"
                      height="315"
                      src={`${
                        el?.link &&
                        el.link.replace(
                          "youtu.be",
                          "www.youtube-nocookie.com/embed"
                        )
                      }`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-[350px] h-[200px] md:w-[529px] md:h-[356px] rounded-[10px] "
                    ></iframe>
                  ) : null}

                  <p className="p-[24px] text-[14px] lg:text-[16px] font-light leading-[24px] text-black400">
                    {el?.deskripsi || "no data"}
                  </p>
                </div>
              </AccordionPanel>
            </AccordionItem>
          );
        })}

        {/* <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                className="w-full text-[16px] md:text-[18px] font-medium leading-[24px] lg:leading-[28px] text-black400 "
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="w-full flex">
              <p className="p-[24px] text-[14px] lg:text-[16px] font-light leading-[24px] text-black400">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut
                numquam consequatur quo corporis excepturi sequi eligendi nam?
                Cupiditate, ipsum nostrum quidem eaque tempore iure accusamus
                quod amet similique, repellat deserunt?
              </p>
            </div>
          </AccordionPanel>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
}

export default ListMateriKelasBisnis;
