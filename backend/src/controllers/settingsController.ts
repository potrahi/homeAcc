import { Pool } from "pg";
import { Request, Response } from "express";
import { SettingService } from "../services/settingService";

export const getSetting = async (req: Request, res: Response, pool: Pool) => {
  const settingService = new SettingService(pool);
  try {
    const setting = await settingService.getSetting(req.params.setting);
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const updateSetting = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const settingService = new SettingService(pool);
  try {
    await settingService.updateSetting(req.params.setting, req.body.value);
    res.json({ message: "Setting updated" });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
