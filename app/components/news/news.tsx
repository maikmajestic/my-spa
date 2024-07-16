import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { News } from '@/app/lib/definitions';
import { setNews } from '@/app/store/slices/newsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import Pagination from '../pagination/pagination';
import NewsCard from './newsCard/newsCard';
import styles from './news.module.scss';

const NewsComponent = ({ data }: { data: News[] }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 4;

  useEffect(() => {
    try {
      dispatch(setNews(data));
      const filteredData = data.filter(
        (news) => 
          news.title !== '[Removed]' && 
          news.content !== null && 
          news.description !== null && 
          news.urlToImage !== null
      );
      setFilteredNews(filteredData);
    } catch (error) {
      console.error("Error filtering news:", error);
    }
  }, [data, dispatch]);

  const indexOfLastNew = currentPage * newsPerPage;
  const indexOfFirstNew = indexOfLastNew - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNew, indexOfLastNew);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.newsWrapper}>
      <h1>{t('news')}</h1>
      {currentNews.length === 0 ? (
        <p>{t('noNewsFound')}</p>
      ) : (
        <div className={styles.newsGrid}>
          {currentNews.map((news, index) => (
            <div className={styles.newsCardWrapper} key={index}>
              <NewsCard news={news}/>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredNews.length / newsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default NewsComponent;
