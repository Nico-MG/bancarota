export default async function id(req, res) {
    res.status(200).json( req.query )
}