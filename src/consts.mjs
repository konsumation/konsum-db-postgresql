/**
 * Prefix of the master record
 */
export const MASTER = "master";

/**
 * Outdated schema version
 */
export const SCHEMA_VERSION_1 = "1";

/**
 * Schema with type + name
 */
export const SCHEMA_VERSION_2 = "2";

/**
 * Schema version for newly created databases 
 */
export const SCHEMA_VERSION_CURRENT = SCHEMA_VERSION_2;


export const METER_ATTRIBUTES = {
  /**
   * Physical unit.
   * @return {string}
   */
  unit: { type: "string", writable: true },

  /**
   * Precission
   * @return {number}
   */
  fractionalDigits: { type: "number", default: 2, writable: true }
};
