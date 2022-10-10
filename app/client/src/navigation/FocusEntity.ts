import { matchPath } from "react-router";
import {
  API_EDITOR_ID_PATH,
  BUILDER_CUSTOM_PATH,
  BUILDER_PATH,
  BUILDER_PATH_DEPRECATED,
  JS_COLLECTION_ID_PATH,
  QUERIES_EDITOR_ID_PATH,
} from "constants/routes";

export enum FocusEntity {
  PAGE = "PAGE",
  API = "API",
  CANVAS = "CANVAS",
  QUERY = "QUERY",
  JS_OBJECT = "JS_OBJECT",
  PROPERTY_PANE = "PROPERTY_PANE",
  NONE = "NONE",
}

export function identifyEntityFromPath(
  path: string,
  hash?: string,
): FocusEntity {
  let appPath = path;
  if (hash) {
    appPath = path.split("#")[0];
  }
  const match = matchPath<{
    apiId?: string;
    queryId?: string;
    appId?: string;
    pageId?: string;
    collectionId?: string;
  }>(appPath, {
    path: [
      BUILDER_PATH_DEPRECATED + API_EDITOR_ID_PATH,
      BUILDER_PATH + API_EDITOR_ID_PATH,
      BUILDER_CUSTOM_PATH + API_EDITOR_ID_PATH,
      BUILDER_PATH_DEPRECATED + QUERIES_EDITOR_ID_PATH,
      BUILDER_PATH + QUERIES_EDITOR_ID_PATH,
      BUILDER_CUSTOM_PATH + QUERIES_EDITOR_ID_PATH,
      BUILDER_PATH_DEPRECATED + JS_COLLECTION_ID_PATH,
      BUILDER_PATH + JS_COLLECTION_ID_PATH,
      BUILDER_CUSTOM_PATH + JS_COLLECTION_ID_PATH,
      BUILDER_PATH_DEPRECATED,
      BUILDER_PATH,
      BUILDER_CUSTOM_PATH,
    ],
  });
  if (!match) {
    return FocusEntity.NONE;
  }
  if (match.params.apiId) {
    return FocusEntity.API;
  }
  if (match.params.queryId) {
    return FocusEntity.QUERY;
  }
  if (match.params.collectionId) {
    return FocusEntity.JS_OBJECT;
  }
  if (match.params.pageId && hash) {
    return FocusEntity.PROPERTY_PANE;
  }
  return FocusEntity.CANVAS;
}