import React from "react";

import {Card} from "antd";

function NewsCard({news}) {
  const {title, description = "", category, url} = news;
  return (
    <Card>
      <h1>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h1>
      <p>{description}</p>
      <p>{category}</p>
    </Card>
  );
}

export default NewsCard;
