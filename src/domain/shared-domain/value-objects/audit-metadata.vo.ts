export interface AuditMetadataProps {
  readonly createdAt: Date;
  readonly createdBy?: string;
  readonly updatedAt: Date;
  readonly updatedBy?: string;
}

/**
 * Entity Audit Metadata Value Object.
 */
export class AuditMetadata {
  private readonly _props: AuditMetadataProps;

  constructor(props: Partial<AuditMetadataProps> = {}) {
    const now = new Date();
    this._props = {
      createdAt: props.createdAt || now,
      createdBy: props.createdBy,
      updatedAt: props.updatedAt || now,
      updatedBy: props.updatedBy
    };
  }

  public get createdAt(): Date { return new Date(this._props.createdAt.getTime()); }
  public get createdBy(): string | undefined { return this._props.createdBy; }
  public get updatedAt(): Date { return new Date(this._props.updatedAt.getTime()); }
  public get updatedBy(): string | undefined { return this._props.updatedBy; }

  public update(updatedBy?: string): AuditMetadata {
    return new AuditMetadata({
      ...this._props,
      updatedAt: new Date(),
      updatedBy: updatedBy || this._props.updatedBy
    });
  }
}
