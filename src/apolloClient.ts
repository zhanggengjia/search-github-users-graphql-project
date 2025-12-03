// ------------------------------------
// 1. Apollo Core Imports
// ------------------------------------
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

import type { GraphQLFormattedError } from 'graphql';

// ------------------------------------
// 2. API Endpoint (GitHub GraphQL API)
// ------------------------------------
// GitHub 的 GraphQL 端點。所有 query 都會打到這裡。
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

// ------------------------------------
// 3. ErrorLink（新版 API）
//    • 用來攔截 GraphQL 與 Network 錯誤
//    • 功能等同於舊的 onError()
// ------------------------------------
const errorLink = new ErrorLink(({ error }) => {
  // -----------------------------
  // 判斷是不是 GraphQL 錯誤
  // GraphQL response 會包含 errors[]
  // -----------------------------
  const graphQLErrors: readonly GraphQLFormattedError[] | undefined =
    CombinedGraphQLErrors.is(error) ? error.errors : undefined;

  // -----------------------------
  // 如果不是 GraphQL 錯誤，且是 JS Error
  // => 我們視為 Network Error
  // -----------------------------
  const networkError: Error | undefined =
    !CombinedGraphQLErrors.is(error) && error instanceof Error
      ? error
      : undefined;

  // -----------------------------
  // 印出 GraphQL 錯誤（課程寫法相同）
  // -----------------------------
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${JSON.stringify(path)}`
      );
    });
  }

  // -----------------------------
  // 印出 Network 錯誤（連不上伺服器等）
  // -----------------------------
  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`);
  }
});

// ------------------------------------
// 4. HttpLink
//    • 用來真正送出 HTTP POST request
//    • 包含 GitHub Token
// ------------------------------------
const httpLink = new HttpLink({
  // 必填：API 位置
  uri: GITHUB_GRAPHQL_API,

  // GitHub GraphQL API 必須帶 Authorization header
  headers: {
    // Token 放在 .env，例如：VITE_GITHUB_TOKEN=xxxxxxx
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

// ------------------------------------
// 5. ApolloLink.from()
//    • 用 array 的順序組 middleware
//    • 每個 request 會依序通過這些 link
// ------------------------------------
const link = ApolloLink.from([
  errorLink, // 第一層：先攔截錯誤
  httpLink, // 第二層：把 query 送出去
]);

// ------------------------------------
// 6. ApolloClient
//    • link: request pipeline
//    • cache: 記憶體快取
// ------------------------------------
const client = new ApolloClient({
  link, // 使用我們上面組好的 middleware chain
  cache: new InMemoryCache(), // Apollo 必備快取（提升效能）
});

// ------------------------------------
// 7. Default Export
// ------------------------------------
export default client;
