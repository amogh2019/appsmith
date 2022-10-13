import { setPageOrder } from "actions/pageActions";
import { Page } from "ce/constants/ReduxActionConstants";
import classNames from "classnames";
import { Colors } from "constants/Colors";
import { ControlIcons, DraggableList } from "design-system";
import { MenuIcons } from "icons/MenuIcons";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentApplicationId } from "selectors/editorSelectors";

const DefaultPageIcon = MenuIcons.DEFAULT_HOMEPAGE_ICON;
const PageIcon = MenuIcons.PAGE_ICON;

function PageListHeader(props: {
  page: Page;
  selectedPage?: string;
  onPageSelect: (pageId: string) => void;
}) {
  const DragIcon = ControlIcons.DRAG_CONTROL;
  const dragContainerRef = useRef(null);

  const bgColor = `bg-[${Colors.GRAY_200.toLowerCase()}]`;
  return (
    <div
      className={classNames({
        "h-9 flex items-center cursor-pointer": true,
        [bgColor]: props.selectedPage === props.page.pageId,
      })}
      onClick={() => {
        props.onPageSelect(props.page.pageId);
      }}
    >
      <div
        className="h-5 pr-1"
        onClick={(e) => e.stopPropagation()}
        ref={dragContainerRef}
      >
        <DragIcon
          color={Colors.GRAY_400}
          cursor="move"
          height={20}
          width={20}
        />
      </div>
      {props.page.isDefault ? (
        <DefaultPageIcon color={Colors.GRAY_800} height={17} width={18} />
      ) : (
        <PageIcon color={Colors.GRAY_800} height={17} width={18} />
      )}
      <div className="font-medium pl-1 text-ellipsis whitespace-nowrap overflow-hidden">
        {props.page.pageName}
      </div>
    </div>
  );
}

function DraggablePageList(props: {
  pages: Page[];
  selectedPage?: string;
  onPageSelect: (pageId: string) => void;
}) {
  const dispatch = useDispatch();
  const applicationId = useSelector(getCurrentApplicationId);

  const onListOrderUpdate = (
    newOrder: any,
    originalIndex: number,
    newIndex: number,
  ) => {
    dispatch(
      setPageOrder(applicationId, props.pages[originalIndex].pageId, newIndex),
    );
  };

  return (
    <DraggableList
      ItemRenderer={({ item }: { item: Page }) => (
        <PageListHeader
          onPageSelect={props.onPageSelect}
          page={item}
          selectedPage={props.selectedPage}
        />
      )}
      itemHeight={37}
      items={props.pages}
      keyAccessor={"pageId"}
      onUpdate={onListOrderUpdate}
      shouldReRender={false}
    />
  );
}

export default DraggablePageList;
