import { useEffect, useState } from "react";
import { CopyToClipboard as ReactCopyToClipboard } from "react-copy-to-clipboard";

const ONE_MINUTE = 1000;
const COPIED_LABEL_TIMEOUT = 2 * ONE_MINUTE;

const useCopyToClipBoard = () => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    const timerId = setTimeout(() => {
      setIsCopied(false);
    }, COPIED_LABEL_TIMEOUT);
    return () => {
      if (timerId) {
        clearTimeout(setIsCopied);
      }
    };
  }, [isCopied]);

  return {
    isCopied,
    setIsCopied,
    CopyToClipboard: ReactCopyToClipboard,
  };
};

export { useCopyToClipBoard };
