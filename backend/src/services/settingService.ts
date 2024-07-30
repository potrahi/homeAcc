import { Pool } from "pg";

export class SettingService {
  constructor(private pool: Pool) {}

  async getSetting(setting: string): Promise<any> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(
        `SELECT ${setting} FROM settings LIMIT 1`
      );
      return rows[0] ? rows[0][setting] : null;
    } finally {
      client.release();
    }
  }

  async updateSetting(setting: string, value: any): Promise<void> {
    const client = await this.pool.connect();
    const query = `UPDATE settings SET ${setting} = $1, last_updated = CURRENT_TIMESTAMP WHERE id = 1`;
    try {
      await client.query(query, [value]);
    } finally {
      client.release();
    }
  }
}
