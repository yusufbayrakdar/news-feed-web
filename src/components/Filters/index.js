import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {DownOutlined} from "@ant-design/icons";
import {Button, DatePicker, Dropdown, Menu, Space} from "antd";
import moment from "moment";

import useQuery from "../../hooks/useQuery";

import {capitilaze, updateQueryString} from "../../utils";
import {CHOOSE_CATEGORY, FEEDS, FEED_VALUES} from "../../utils/constants";

import {Container, StyledMenu} from "./styles";

function Filters() {
  const history = useHistory();
  const queryService = useQuery();

  const feed = queryService.get("feed");
  const fromDate = queryService.get("from-date");
  const toDate = queryService.get("to-date");
  const category = queryService.get("category");

  const foundFeedConstant = Object.values(FEEDS).find(({value}) => value === feed);
  const feedLabel = foundFeedConstant?.label || FEEDS.THE_GUARDIAN.label;

  const theGuardianCategories = useSelector((state) => state.news.theGuardianCategories);
  const newYorkTimesCategories = useSelector((state) => state.news.newYorkTimesCategories);

  let categories;
  switch (feed) {
    case FEED_VALUES.THE_GUARDIAN:
      categories = theGuardianCategories;
      break;

    case FEED_VALUES.NEW_YORK_TIMES:
      categories = newYorkTimesCategories;
      break;

    default:
      categories = theGuardianCategories;
      break;
  }

  const menu = (
    <Menu style={{marginTop: 7}}>
      {Object.values(FEEDS).map(({label, value}, i) => {
        return (
          <Menu.Item
            key={i}
            className="text-center"
            onClick={() =>
              history.push(updateQueryString({key: "feed", value: encodeURIComponent(value), resetPage: true}))
            }>
            {label}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const categoriesMenu = (
    <StyledMenu>
      <Menu.Item
        className="text-center"
        onClick={() => {
          history.push(updateQueryString({key: "category", value: encodeURIComponent("")}));
        }}>
        {CHOOSE_CATEGORY}
      </Menu.Item>
      {categories.map((category, i) => {
        return (
          <Menu.Item
            key={i}
            className="text-center"
            onClick={() => {
              history.push(updateQueryString({key: "category", value: encodeURIComponent(category?.toLowerCase())}));
            }}>
            {category}
          </Menu.Item>
        );
      })}
    </StyledMenu>
  );

  const onCalendarChange = (_, [start, end]) => {
    const withStartQuery = updateQueryString({key: "from-date", value: encodeURIComponent(start)});
    const withEndQuery = updateQueryString({key: "to-date", value: encodeURIComponent(end), customUrl: withStartQuery});
    history.push(withEndQuery);
  };

  const defaultDateQuery = fromDate && toDate ? {defaultValue: [moment(fromDate), moment(toDate)]} : {};

  return (
    <Container>
      {/* Feed Filter */}
      <Dropdown overlay={menu}>
        <Button style={{width: "90%"}}>
          <Space>
            {feedLabel}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      {/* Date Filter */}
      <Space direction="vertical" size={12} style={{paddingLeft: 5, paddingRight: 5}}>
        <DatePicker.RangePicker allowClear onChange={onCalendarChange} {...defaultDateQuery} />
      </Space>

      {/* Category Filter */}
      <Dropdown overlay={categoriesMenu} allowClear>
        <Button style={{width: "90%"}}>
          <Space>
            {capitilaze(category) || CHOOSE_CATEGORY}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Container>
  );
}

export default Filters;
