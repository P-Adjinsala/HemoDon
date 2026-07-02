import { Request, Response } from "express";
import Role from "../models/Role";

export const getAllRoles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const roles = await Role.findAll();

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch roles"
    });
  }
};

export const getRoleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role = await Role.findByPk(Number(req.params.id));

    if (!role) {
      res.status(404).json({
        success: false,
        message: "Role not found"
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role = await Role.create(req.body);

    res.status(201).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create role"
    });
  }
};

export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role = await Role.findByPk(Number(req.params.id));

    if (!role) {
      res.status(404).json({
        success: false,
        message: "Role not found"
      });
      return;
    }

    await role.update(req.body);

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};

export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role = await Role.findByPk(Number(req.params.id));

    if (!role) {
      res.status(404).json({
        success: false,
        message: "Role not found"
      });
      return;
    }

    await role.destroy();

    res.status(200).json({
      success: true,
      message: "Role deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
};