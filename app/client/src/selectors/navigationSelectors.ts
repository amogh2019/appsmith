import { ENTITY_TYPE } from "entities/DataTree/dataTreeFactory";
import { createSelector } from "reselect";
import {
  getActionsForCurrentPage,
  getJSCollectionsForCurrentPage,
} from "selectors/entitiesSelector";
import { getWidgets } from "sagas/selectors";
import { getCurrentPageId } from "selectors/editorSelectors";
import { getActionConfig } from "pages/Editor/Explorer/Actions/helpers";
import { builderURL, jsCollectionIdURL } from "RouteBuilder";

export type EntityNavigationData = Record<
  string,
  { id: string; type: ENTITY_TYPE; url: string | undefined }
>;

export const getEntitiesForNavigation = createSelector(
  getActionsForCurrentPage,
  getJSCollectionsForCurrentPage,
  getWidgets,
  getCurrentPageId,
  (actions, jsActions, widgets, pageId) => {
    const navigationData: EntityNavigationData = {};

    actions.forEach((action) => {
      const config = getActionConfig(action.config.pluginType);
      navigationData[action.config.name] = {
        id: action.config.id,
        type: ENTITY_TYPE.ACTION,
        url: config?.getURL(pageId, action.config.id, action.config.pluginType),
      };
    });

    jsActions.forEach((jsAction) => {
      navigationData[jsAction.config.name] = {
        id: jsAction.config.id,
        type: ENTITY_TYPE.JSACTION,
        url: jsCollectionIdURL({ pageId, collectionId: jsAction.config.id }),
      };
    });

    Object.values(widgets).forEach((widget) => {
      navigationData[widget.widgetName] = {
        id: widget.widgetId,
        type: ENTITY_TYPE.WIDGET,
        url: builderURL({ pageId, hash: widget.widgetId }),
      };
    });

    return navigationData;
  },
);
