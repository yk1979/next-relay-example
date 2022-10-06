import { NextApiRequest, NextApiResponse } from "next";
import { createYogaServer } from "../../graphql/server/yogaServer";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const server = await createYogaServer();
  return server(req, res);
}
