import { useEffect, useState } from "react";
import { ModalProps, News } from "@/app/lib/definitions";
import Image from "next/image";
import { formatDate } from "../utils/date";
import styles from "./modal.module.scss"

const NewsModal: React.FC<ModalProps & { news?: News }> = ({
  isOpen,
  onClose,
  news: initialNews,
}) => {
  const [news, setNews] = useState<News>(
    initialNews || {
      id: "0",
      title: "",
      description: "",
      content: "",
      urlToImage: "",
      source: {
        name: "",
      },
      publishedAt: "",
    }
  );

  useEffect(() => {
    setNews(news);
  }, [])

  const renderContent = () => {
    return { __html: news?.content || "" };
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h4 className={styles.modalTitle}>{news?.title}</h4>
        <p className={styles.modalSubtitle}>{formatDate(news?.publishedAt)}</p>
        <Image src={news?.urlToImage} width={100} height={300} alt={news.title} layout="responsive"/>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={renderContent()}
        />
        <p className={styles.modalSubtitle}>{news?.source?.name}</p>
      </div>
    </div>
  );
};

export default NewsModal;
