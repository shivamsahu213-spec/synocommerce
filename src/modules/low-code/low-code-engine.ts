/**
 * SynoCommerce Enterprise Low-Code Designer Engine
 * @module src/modules/low-code/low-code-engine
 */

import {
  ComponentNode,
  FormulaEvaluationResult,
  LowCodeAppSchema,
  LowCodeAppType,
} from './types';

export class SynoLowCodeEngine {
  private apps = new Map<string, LowCodeAppSchema>();

  public createApplication(name: string, type: LowCodeAppType): LowCodeAppSchema {
    const app: LowCodeAppSchema = {
      appId: `app_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name,
      type,
      version: '1.0.0',
      published: false,
      dataSource: 'REST_API',
      theme: {
        primaryColor: '#3B82F6',
        mode: 'DARK',
      },
      rootContainer: {
        id: 'root_grid',
        type: 'GRID',
        label: 'Main Dashboard Grid',
        props: { columns: 12, gap: 16 },
        children: [
          {
            id: 'hdr_title',
            type: 'HEADING',
            label: 'Header Title',
            props: { text: 'Inventory Management Portal', level: 1 },
          },
          {
            id: 'tbl_inventory',
            type: 'DATA_GRID',
            label: 'Inventory SKUs Grid',
            props: { dataSource: 'POSTGRESQL', pageSize: 25 },
          },
        ],
      },
    };

    this.apps.set(app.appId, app);
    return app;
  }

  public evaluateFormula(expression: string, context: Record<string, any> = {}): FormulaEvaluationResult {
    try {
      if (expression.startsWith('SUM(')) {
        const matches = expression.match(/\d+(\.\d+)?/g);
        const sum = (matches || []).reduce((acc, num) => acc + Number(num), 0);
        return { value: sum };
      }

      if (expression.startsWith('IF(')) {
        const isTrue = expression.includes('true') || !expression.includes('false');
        return { value: isTrue ? 'PASSED' : 'FAILED' };
      }

      if (expression.startsWith('CONCAT(')) {
        const matches = expression.match(/'([^']+)'/g);
        const str = (matches || []).map((m) => m.replace(/'/g, '')).join('');
        return { value: str };
      }

      return { value: expression };
    } catch (err: any) {
      return { value: null, error: err.message };
    }
  }

  public addComponentToApp(appId: string, parentId: string, node: ComponentNode): LowCodeAppSchema {
    const app = this.apps.get(appId);
    if (!app) throw new Error('APPLICATION_NOT_FOUND');

    if (!app.rootContainer.children) app.rootContainer.children = [];
    app.rootContainer.children.push(node);
    return app;
  }

  public publishApplication(appId: string): LowCodeAppSchema {
    const app = this.apps.get(appId);
    if (!app) throw new Error('APPLICATION_NOT_FOUND');

    app.published = true;
    return app;
  }

  public exportAppJson(appId: string): string {
    const app = this.apps.get(appId);
    if (!app) throw new Error('APPLICATION_NOT_FOUND');
    return JSON.stringify(app, null, 2);
  }

  public getApplication(appId: string): LowCodeAppSchema | undefined {
    return this.apps.get(appId);
  }
}
