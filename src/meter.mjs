import { Meter, id } from "@konsumation/model";

/**
 *
 */
export class PostgresMeter extends Meter {
  static get attributeNameMapping() {
    return {
      fractionalDigits: "fractional_digits",
      validFrom: "valid_from",
      category: null,
      "category.id": "category_id"
    };
  }

  static get attributes() {
    return {
      ...super.attributes,
      id
    };
  }

  primaryKeyExpression(sql) {
    return sql({ id: this.id }, "id");
  }

  async write(sql) {
    const values = this.attributeValues;
    const names = Object.keys(values);

    if (this.id) {
      await sql`UPDATE meter SET ${sql(
        values,
        ...names
      )} WHERE ${this.primaryKeyExpression(sql)}`;
    } else {
      this.id = (
        await sql`INSERT INTO meter ${sql(values, ...names)} RETURNING id`
      )[0].id;
    }
  }

  //TODO where clause on primary key?
  static async entry(sql, name) {
    const result = await sql`SELECT * FROM meter WHERE name=${name}`;
    return new this({ name, ...result[0] });
  }
  /**
   * Delete record from database.
   * @param {*} sql
   */
  async delete(sql) {
    if (this.id) {
      return sql`DELETE FROM meter WHERE ${this.primaryKeyExpression(sql)}`;
    }
  }

  /**
   * Write a time/value pair.
   */
  async writeValue(context, date, value) {
    try {
      await context`INSERT INTO "values"${context(
        {
          value,
          meter_id: this.id,
          date
        },
        "value",
        "meter_id",
        "date"
      )}`;
    } catch (e) {
      console.log(e.query);
      throw e;
    }
  }
}
