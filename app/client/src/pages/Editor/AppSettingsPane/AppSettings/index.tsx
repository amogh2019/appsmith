import { Page } from "ce/constants/ReduxActionConstants";
import { ThemePropertyPane } from "pages/Editor/ThemePropertyPane";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllPages } from "selectors/entitiesSelector";
import styled from "styled-components";
import GeneralSettings from "./GeneralSettings";
import SectionHeader, { SectionHeaderProps } from "./SectionHeader";
import DraggablePageList from "./DraggablePageList";
import PageSettings from "./PageSettings";
import { getAppSettingsPane } from "selectors/appSettingsPaneSelectors";
import {
  GENERAL_SETTINGS_SECTION_CONTENT_HEADER,
  GENERAL_SETTINGS_SECTION_HEADER,
  GENERAL_SETTINGS_SECTION_HEADER_DESC,
  PAGE_SETTINGS_SECTION_CONTENT_HEADER,
  PAGE_SETTINGS_SECTION_HEADER,
  THEME_SETTINGS_SECTION_CONTENT_HEADER,
  THEME_SETTINGS_SECTION_HEADER,
  THEME_SETTINGS_SECTION_HEADER_DESC,
} from "ce/constants/messages";
import { Colors } from "constants/Colors";

export enum AppSettingsTabs {
  General,
  Theme,
  Page,
}

export interface SelectedTab {
  type: AppSettingsTabs;
  page?: Page;
}

const Wrapper = styled.div`
  height: calc(100% - 48px);
`;

const SectionContent = styled.div`
  box-shadow: -1px 0 0 0 ${Colors.ALTO2};
`;

const HeaderText = styled.div`
  height: 48px;
`;

const ThemeContentWrapper = styled.div`
  height: calc(100% - 48px);
  overflow-y: overlay;
`;

function AppSettings() {
  const { context } = useSelector(getAppSettingsPane);
  const pages: Page[] = useSelector(selectAllPages);

  const [selectedTab, setSelectedTab] = useState<SelectedTab>({
    type: context?.type || AppSettingsTabs.General,
    page:
      context?.pageId && pages.length > 0
        ? pages.find((page) => page.pageId === context.pageId) || pages[0]
        : undefined,
  });

  useEffect(() => {
    if (selectedTab.page?.pageId && pages.length > 0) {
      setSelectedTab({
        ...selectedTab,
        page:
          pages.find((page) => page.pageId === selectedTab.page?.pageId) ||
          pages[0],
      });
    }
  }, [selectedTab.page?.pageId, pages]);

  const SectionHeadersConfig: SectionHeaderProps[] = [
    {
      icon: "settings-2-line",
      isSelected: selectedTab.type === AppSettingsTabs.General,
      name: GENERAL_SETTINGS_SECTION_HEADER(),
      onClick: () => {
        setSelectedTab({ type: AppSettingsTabs.General });
      },
      subText: GENERAL_SETTINGS_SECTION_HEADER_DESC(),
    },
    {
      icon: "edit-line",
      isSelected: selectedTab.type === AppSettingsTabs.Theme,
      name: THEME_SETTINGS_SECTION_HEADER(),
      onClick: () => {
        setSelectedTab({ type: AppSettingsTabs.Theme });
      },
      subText: THEME_SETTINGS_SECTION_HEADER_DESC(),
    },
  ];

  return (
    <Wrapper className="flex flex-row">
      <div className="w-1/2">
        {SectionHeadersConfig.map((config) => (
          <SectionHeader key={config.name} {...config} />
        ))}
        <div
          className={`border-t-[1px] border-[${Colors.ALTO_4.toLowerCase()}]`}
        />
        <HeaderText className="leading-[3rem] font-medium px-4">
          {PAGE_SETTINGS_SECTION_HEADER()}
        </HeaderText>
        <DraggablePageList
          onPageSelect={(pageId: string) =>
            setSelectedTab({
              type: AppSettingsTabs.Page,
              page: pages.find((page) => page.pageId === pageId),
            })
          }
          pages={pages}
          selectedPage={selectedTab.page?.pageId}
        />
      </div>
      <SectionContent className="w-1/2">
        {(() => {
          switch (selectedTab.type) {
            case AppSettingsTabs.General:
              return (
                <div className="px-4">
                  <HeaderText className="leading-[3rem] font-medium">
                    {GENERAL_SETTINGS_SECTION_CONTENT_HEADER()}
                  </HeaderText>
                  <GeneralSettings />
                </div>
              );
            case AppSettingsTabs.Theme:
              return (
                <>
                  <div className="px-4">
                    <HeaderText className="leading-[3rem] font-medium">
                      {THEME_SETTINGS_SECTION_CONTENT_HEADER()}
                    </HeaderText>
                  </div>
                  <ThemeContentWrapper>
                    <ThemePropertyPane />
                  </ThemeContentWrapper>
                </>
              );
            case AppSettingsTabs.Page:
              return (
                selectedTab.page && (
                  <div className="px-4">
                    <HeaderText className="leading-[3rem] font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                      {selectedTab.page.pageName +
                        " " +
                        PAGE_SETTINGS_SECTION_CONTENT_HEADER()}
                    </HeaderText>
                    <PageSettings page={selectedTab.page} />
                  </div>
                )
              );
          }
        })()}
      </SectionContent>
    </Wrapper>
  );
}

export default AppSettings;
