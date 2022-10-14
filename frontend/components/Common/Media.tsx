import { useEffect, useState } from "react";
import { parseImgUrl } from "../../utils/common";
import axios from "axios";
import filetypeinfo from "magic-bytes.js";
import React from "react";

const Media = ({
  className = "",
  url = "",
}) => {
  const [media, setMedia] = useState<{
    type: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    if (url) {
      getMedia();
    } 
  }, [url]);

  const getMedia = async () => {
    try {
      const resp = await axios.get(`${parseImgUrl(url)}`, {
        responseType: "arraybuffer",
      });

      const fileType = await filetypeinfo(new Uint8Array(resp.data));
      const fileTypeMime = fileType.map((e) => e.mime || "");

      const objectUrl = URL.createObjectURL(new Blob([resp.data]));

      setMedia({
        type: fileTypeMime[0],
        url: objectUrl,
      });
    } catch (err) {
      console.log(err);
      setMedia({
        type: "image/jpg",
        url: parseImgUrl(url),
      });
    }
  };

  if (media?.type.includes("image")) {
    return (
      <div className={className}>
        <img className="h-full w-full object-contain" src={media.url} />
      </div>
    );
  }

  return null;
};

export default Media;
