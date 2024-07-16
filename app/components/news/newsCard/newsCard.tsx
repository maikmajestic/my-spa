import { useState } from "react"
import Image from "next/image"
import { News } from "@/app/lib/definitions"
import NewsModal from "../../modals/newsModal"
import { formatDate } from "../../utils/date"
import { useLanguage } from "@/app/context/LanguageContext"
import styles from "./newsCard.module.scss"

const NewsCard = ({ news }: { news: News }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultImageUrl = "/news.png";

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className={styles.newsCard} key={news.id}>
      <div className={styles.imageCard}>
        <Image src={news?.urlToImage || defaultImageUrl} width={100} height={300} alt={news.title} layout="responsive"/>
      </div>
      <div className={styles.contentCard}>
        <h4>{news?.title}</h4>
        <p className={styles.dateText}>{formatDate(news?.publishedAt)}</p>
        <p className={styles.contentText}>{news?.description}</p>
        <p className={styles.secondaryText}>{news?.source?.name}</p>
        <a className={styles.linkNews} onClick={handleOpenModal}>{t('readMore')}</a>
      </div>
      <NewsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} news={news}/>
    </div>
  )
}

export default NewsCard
