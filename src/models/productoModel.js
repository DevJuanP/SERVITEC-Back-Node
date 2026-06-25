import { getDB } from '../config/db.js';

const collectionName = 'productos';

export const getProductosConCategoria = async () => {
  const db = getDB();
  const pipeline = [
    {
      $lookup: {
        from: "subcategorias",
        localField: "subcategoriaId",
        foreignField: "_id",
        as: "subcatInfo"
      }
    },
    { $unwind: "$subcatInfo" },
    {
      $lookup: {
        from: "categorias",
        localField: "categoriaId",
        foreignField: "_id",
        as: "catInfo"
      }
    },
    { $unwind: "$catInfo" },
    {
      $project: {
        _id: 1,
        id: "$_id",
        name: 1,
        price: 1,
        description: 1,
        img: 1,
        categoria: {
          name: "$catInfo.name",
          Subcategoria: "$subcatInfo.name"
        }
      }
    }
  ];

  return await db.collection(collectionName).aggregate(pipeline).toArray();
};
