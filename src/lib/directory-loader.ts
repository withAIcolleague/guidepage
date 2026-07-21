/**
 * 디렉토리 데이터 로더
 *
 * src/data/directory/*.json 파일에서 디렉토리 엔트리를 읽어오는 유틸리티.
 * 클라이언트 사이드에서 사용할 수 있도록 JSON import 기반으로 구성.
 */

import type { ClassifiedSite } from "@/data/directory/directory-schema";

import beingReasonData from "@/data/directory/being-reason.json";
import valueExchangeData from "@/data/directory/value-exchange.json";
import normsGovernanceData from "@/data/directory/norms-governance.json";
import expressionSensationData from "@/data/directory/expression-sensation.json";
import historyRecordsData from "@/data/directory/history-records.json";
import lifeHealthData from "@/data/directory/life-health.json";
import toolsIntelligenceData from "@/data/directory/tools-intelligence.json";
import beliefReligionData from "@/data/directory/belief-religion.json";
import uncategorizedData from "@/data/directory/uncategorized.json";

interface DirectoryCategoryData {
  categoryId: string;
  categoryName: string;
  lastUpdated: string;
  entries: ClassifiedSite[];
}

/** 대분류별 디렉토리 데이터 */
const ALL_CATEGORY_DATA: DirectoryCategoryData[] = [
  beingReasonData as DirectoryCategoryData,
  valueExchangeData as DirectoryCategoryData,
  normsGovernanceData as DirectoryCategoryData,
  expressionSensationData as DirectoryCategoryData,
  historyRecordsData as DirectoryCategoryData,
  lifeHealthData as DirectoryCategoryData,
  toolsIntelligenceData as DirectoryCategoryData,
  beliefReligionData as DirectoryCategoryData,
  uncategorizedData as DirectoryCategoryData,
];

const normalize = (value: string) => value.trim().toLowerCase();

function getCategoryData(categoryId: string): DirectoryCategoryData | undefined {
  return ALL_CATEGORY_DATA.find((data) => data.categoryId === categoryId);
}

function belongsToSection(entry: ClassifiedSite, sectionName: string): boolean {
  return normalize(entry.categoryPath[1] ?? "") === normalize(sectionName);
}

/** 대분류 또는 중분류 ID별 엔트리 목록 반환 */
export function getDirectoryEntries(
  categoryId: string,
  sectionName?: string,
): ClassifiedSite[] {
  const data = getCategoryData(categoryId);
  if (!data) return [];
  if (!sectionName) return data.entries;
  return data.entries.filter((entry) => belongsToSection(entry, sectionName));
}

/** 대분류 전체 엔트리 수 반환 */
export function getDirectoryCount(categoryId: string): number {
  return getDirectoryEntries(categoryId).length;
}

/** 중분류별 엔트리 수 반환 */
export function getSectionDirectoryCount(
  categoryId: string,
  sectionName: string,
): number {
  return getDirectoryEntries(categoryId, sectionName).length;
}

/** 전체 디렉토리 엔트리 수 반환 */
export function getTotalDirectoryCount(): number {
  return ALL_CATEGORY_DATA.reduce((sum, data) => sum + data.entries.length, 0);
}

/** 대분류/중분류별 조직 유형 분포 */
export function getOrgTypeDistribution(
  categoryId: string,
  sectionName?: string,
): Record<string, number> {
  const entries = getDirectoryEntries(categoryId, sectionName);
  const dist: Record<string, number> = {};
  for (const entry of entries) {
    const type = entry.organizationType ?? "Unknown";
    dist[type] = (dist[type] || 0) + 1;
  }
  return dist;
}

/** 전체 디렉토리에서 키워드 검색 */
export function searchDirectory(query: string): ClassifiedSite[] {
  if (!query.trim()) return [];
  const normalizedQuery = normalize(query);

  return ALL_CATEGORY_DATA.flatMap((data) =>
    data.entries.filter((entry) => {
      const haystack = [
        entry.siteName,
        entry.description,
        entry.url,
        ...entry.tags,
        ...entry.categoryPath,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    })
  );
}

/** 대분류/중분류별 태그 목록 (빈도순) */
export function getTopTags(
  categoryId: string,
  sectionName?: string,
  limit = 10,
): { tag: string; count: number }[] {
  const entries = getDirectoryEntries(categoryId, sectionName);
  const freq: Record<string, number> = {};
  for (const entry of entries) {
    for (const tag of entry.tags) {
      freq[tag] = (freq[tag] || 0) + 1;
    }
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}
