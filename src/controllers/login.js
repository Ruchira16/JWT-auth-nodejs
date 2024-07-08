const express = require("express");
const config = Object.assign({}, global.gConfig);
const apiResponse = require("../utils/apiResponse");
const datasource = require("../connections/mysql");
const loginUserRepo = datasource.getRepository("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createDefaultUser = async (req, res) => {
  try {
    defaultUser = {
      id: 1,
      userId: 1,
      email: "admin@gmail.com",
      password: "$2y$10$Nuqw.p4IPWwSBglRiJjao.w6/0u84X4A4ICIZqVnIsrBUGqyWqrbO",
      active: 1,
      firstLogin: 1,
    };
    new Promise(async (resolve, reject) => {
      await loginUserRepo
        .createQueryBuilder()
        .insert()
        .into("users")
        .values([defaultUser])
        .orIgnore()
        .execute();
      resolve();
    });

    return apiResponse.successResponseWithNoData(
      res,
      "User LoggedIn successfully"
    );
  } catch (error) {
    console.error(error);
    return apiResponse.serverErrorResponse(res, "Internal Server Error");
  }
};

exports.register = async (req, res, next) => {
  try {
    newUser = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      active: req.body.active ? req.body.active : 1,
      firstLogin: req.body.firstLogin ? req.body.firstLogin : 1,
    };

    new Promise(async (resolve, reject) => {
      await loginUserRepo
        .createQueryBuilder()
        .insert()
        .into("users")
        .values([newUser])
        .orIgnore()
        .execute();
      resolve();
    });
    return apiResponse.successResponseWithNoData(
      res,
      "User Registered successfully"
    );
  } catch (error) {
    console.error(error);
    return apiResponse.serverErrorResponse(res, "User Registration Failed");
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log("req.body:: ", req.body);
    let user = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log("user:: ", user, user.email);
    const userExist = await loginUserRepo.findOne({
      where: {
        email: user.email,
      },
    });
    console.log("userExist:: ", userExist);
    if (!userExist) {
      return apiResponse.badRequest(res, "User does not exist");
    }
    const passwordMatch = await bcrypt.compare(
      user.password,
      userExist.password
    );
    if (!passwordMatch) {
      return apiResponse.badRequest(res, "Authentication Failed");
    }
    const token = jwt.sign(
      { userId: userExist.id },
      config.jwtConfig.JWT_SECRET_KEY,
      {
        expiresIn: config.jwtConfig.JWT_EXPIRY_TIME,
      }
    );

    var result = {
      token: token,
      userId: userExist.id,
      email: userExist.email,
      active: userExist.active,
    };

    return apiResponse.successResponseWithData(res, "Successfull", result);
  } catch (error) {
    console.error(error);
    return apiResponse.serverErrorResponse(res, "Internal Server Error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    let result = await loginUserRepo.createQueryBuilder().select("*").execute();
    return apiResponse.successResponseWithData(
      res,
      "User List Fetch Successfully",
      result
    );
  } catch (error) {
    console.log(error);
    return apiResponse.serverErrorResponse(res, "Internal Server Error");
  }
};
