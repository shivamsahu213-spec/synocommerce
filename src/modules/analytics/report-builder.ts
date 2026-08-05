/**
 * Dynamic Report Builder & Export Engine
 * @module src/modules/analytics/report-builder
 */

import { DynamicReportSpec, ExportedReport } from './types';

export class ReportBuilderEngine {
  public generateReport(spec: DynamicReportSpec, rawData: Record<string, any>[]): Record<string, any>[] {
    let filtered = [...rawData];

    if (spec.filters && spec.filters.length > 0) {
      for (const filter of spec.filters) {
        filtered = filtered.filter((row) => {
          const val = row[filter.field];
          if (filter.operator === 'EQUALS') return val === filter.value;
          if (filter.operator === 'GREATER_THAN') return val > filter.value;
          if (filter.operator === 'LESS_THAN') return val < filter.value;
          if (filter.operator === 'CONTAINS') return String(val).includes(String(filter.value));
          return true;
        });
      }
    }

    return filtered;
  }

  public exportReport(reportName: string, format: 'CSV' | 'EXCEL' | 'JSON', data: Record<string, any>[]): ExportedReport {
    let content = '';

    if (format === 'JSON') {
      content = JSON.stringify(data, null, 2);
    } else if (format === 'CSV') {
      const firstRow = data[0];
      if (firstRow) {
        const headers = Object.keys(firstRow).join(',');
        const rows = data.map((row) => Object.values(row).join(',')).join('\n');
        content = `${headers}\n${rows}`;
      }
    } else if (format === 'EXCEL') {
      content = `<xml><Workbook>${JSON.stringify(data)}</Workbook></xml>`;
    }

    return {
      reportName,
      format,
      content,
    };
  }
}
