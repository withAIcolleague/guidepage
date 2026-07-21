/**
 * 디렉토리 시스템 데이터 스키마
 *
 * 3-에이전트 파이프라인에서 사용하는 TypeScript 인터페이스 정의.
 * - 에이전트 1: SiteMetadata (정제된 사이트 메타데이터)
 * - 에이전트 2: ClassifiedSite (분류 완료된 사이트)
 * - 에이전트 3: RoutedSiteEntry (파일 라우팅 결과)
 */

/** 에이전트 1 출력: 정제된 사이트 메타데이터 */
export interface SiteMetadata {
  url: string;
  isValid: boolean;
  siteName: string;
  description: string;
}

/** 조직 유형 (보조 필터) */
export type OrganizationType = "Government" | "Public" | "Enterprise" | "Individual";

/** 에이전트 2 출력: 분류 완료된 사이트 정보 */
export interface ClassifiedSite {
  siteName: string;
  url: string;
  organizationType: OrganizationType;
  categoryPath: [string, string, string]; // [대분류, 중분류, 소분류]
  tags: string[];
  description: string;
}

/** 에이전트 3 출력: 파일 라우팅 결과 */
export interface RoutedSiteEntry {
  targetFile: string;
  data: ClassifiedSite;
}

/** 대분류별 카테고리 파일의 루트 구조 */
export interface DirectoryCategoryFile {
  categoryId: string;
  categoryName: string;
  lastUpdated: string;
  entries: ClassifiedSite[];
}

/** _index.json의 구조 */
export interface DirectoryIndex {
  version: string;
  lastUpdated: string;
  categoryMapping: Record<string, string>;
  organizationTypes: OrganizationType[];
  stats: {
    totalEntries: number;
    byCategory: Record<string, number>;
    byOrganizationType: Record<string, number>;
  };
}

/**
 * 대분류 ID ↔ 대분류 한글명 매핑 테이블
 * workflow-categories.ts 의 7개 대분류와 동기화
 */
export const CATEGORY_ID_MAP: Record<string, string> = {
  "존재와 이성": "being-reason",
  "가치와 신용": "value-exchange",
  "규범과 질서": "norms-governance",
  "표현과 감성": "expression-sensation",
  "물질과 우주": "matter-cosmos",
  "생명과 건강": "life-health",
  "도구와 지능": "tools-intelligence",
};

/** 대분류 ID → 한글명 역방향 매핑 */
export const CATEGORY_NAME_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_ID_MAP).map(([name, id]) => [id, name])
);

/** 대분류 ID → JSON 파일명 매핑 */
export function categoryFileName(categoryId: string): string {
  return `${categoryId}.json`;
}

/** 대분류 한글명 → JSON 파일명 매핑 */
export function categoryFileNameByKorean(categoryName: string): string {
  const id = CATEGORY_ID_MAP[categoryName];
  if (!id) return "uncategorized.json";
  return `${id}.json`;
}
