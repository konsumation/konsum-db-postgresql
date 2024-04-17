import { Value } from "@konsumation/model";

/**
 *
 */
export class PostgresValue extends Value {
  static get attributeNameMapping() {
    return {
      meter: null,
      "meter.id": "meter_id"
    };
  }

  primaryKeyExpression(sql) {
    // @ts-ignore
    return sql({ meter_id: this.meter.id, date: this.date }, "meter_id", "date");
  }

  async write(sql) {
    const values = this.getAttributes();
    const names = Object.keys(values);
    return sql`INSERT INTO "values"${sql(values, ...names)}`;
  }
}