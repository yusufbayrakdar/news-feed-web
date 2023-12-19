import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {Pagination, Spin} from "antd";

import CategoryModal from "../../components/Modals/CategoryModal";
import NewsCard from "../../components/NewsCard";

import useBaseScreen from "../../hooks/useBaseScreen";
import useQuery from "../../hooks/useQuery";

import {prepareFilter, updateQueryString} from "../../utils";
import {FEEDS} from "../../utils/constants";

import {Container, OpacityLoadingContainer, PagiationContainer, SpinnerContainer, StyledSearch} from "./styles";

function News() {
  const {dispatchAction, $} = useBaseScreen();
  const history = useHistory();
  const queryService = useQuery();

  const page = queryService.get("page");
  const q = queryService.get("q");
  const feed = queryService.get("feed");
  const fromDate = queryService.get("from-date");
  const toDate = queryService.get("to-date");
  const category = queryService.get("category");

  const [closeRequested, setCloseRequested] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const feedNews = useSelector((state) => state.news.feedNews);
  const newsLoading = useSelector((state) => state.news.newsLoading);
  const categoryModalVisible = useSelector((state) => state.user.categoryModalVisible);
  const saveUserPreferredCategoriesLoading = useSelector((state) => state.user.saveUserPreferredCategoriesLoading);
  const categoryModalCanceled = useSelector((state) => state.user.categoryModalCanceled);

  const {docs, totalPages} = feedNews;

  const closeCategoryModal = useCallback(() => {
    dispatchAction($().SET_CATEGORY_MODAL_VISIBLE, false);
  }, [$, dispatchAction]);

  useEffect(() => {
    if (user && !user.categories.length) {
      closeCategoryModal();
    }
  }, [user, closeCategoryModal]);

  useEffect(() => {
    if (user && !user.categories?.length && !categoryModalCanceled) {
      setTimeout(() => {
        dispatchAction($().SET_CATEGORY_MODAL_VISIBLE, true);
      }, 1000);
    }
  }, [$, dispatchAction, user, categoryModalCanceled]);

  useEffect(() => {
    if (closeRequested && !saveUserPreferredCategoriesLoading) {
      closeCategoryModal();
    }
  }, [closeCategoryModal, closeRequested, saveUserPreferredCategoriesLoading]);

  useEffect(() => {
    const getActionTypeForFeed = () => {
      switch (feed) {
        case FEEDS.THE_GUARDIAN.value:
          return $().THE_GUARDIAN_SEARCH_REQUEST;

        case FEEDS.NEW_YORK_TIMES.value:
          return $().NEW_YORK_TIMES_REQUEST;

        default:
          return $().THE_GUARDIAN_SEARCH_REQUEST;
      }
    };

    const actionType = getActionTypeForFeed();

    dispatchAction(actionType, {
      q,
      page,
      "from-date": fromDate,
      "to-date": toDate,
      category: prepareFilter(category)
    });
  }, [$, dispatchAction, q, page, feed, fromDate, toDate, category]);

  const onSearch = (value) => {
    history.push(updateQueryString({key: "q", value: encodeURIComponent(value.trim()), resetPage: true}));
  };

  const onPageChange = (page) => {
    history.push(updateQueryString({key: "page", value: page, resetPage: true}));
  };

  return (
    <Container>
      <CategoryModal
        categories={user?.categories || []}
        isVisible={categoryModalVisible}
        close={closeCategoryModal}
        onSubmit={() => setCloseRequested(true)}
      />
      {newsLoading && (
        <SpinnerContainer>
          <Spin />
        </SpinnerContainer>
      )}
      <StyledSearch allowClear onSearch={onSearch} placeholder="Search News..." />
      <OpacityLoadingContainer loading={newsLoading}>
        {docs?.map((news, i) => (
          <NewsCard key={i} news={news} />
        ))}
      </OpacityLoadingContainer>
      <PagiationContainer>
        <Pagination
          defaultCurrent={1}
          current={Number(page)}
          total={totalPages}
          showSizeChanger={false}
          showQuickJumper
          onChange={onPageChange}
        />
      </PagiationContainer>
    </Container>
  );
}

export default News;
