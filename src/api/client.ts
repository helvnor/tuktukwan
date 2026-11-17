import axios from "axios";
import { environments } from "../config/environment";

export const apiClient = axios.create({
  baseURL: environments.apiUrl,
  withCredentials: true,
  timeout: 10000,
});
