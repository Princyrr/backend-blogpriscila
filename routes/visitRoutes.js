import express from 'express';
import Visit from '../models/Visit.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const visit = await Visit.findOneAndUpdate(
      {},
      { $inc: { count: 1 } }, // incrementa +1
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Se for a primeira vez, começa em 6421
    if (visit.count === 1) {
      visit.count = 6421;
      await visit.save();
    }

    res.json({ count: visit.count });
  } catch (err) {
    console.error('Erro ao buscar visitas:', err);
    res.status(500).json({ error: 'Erro ao buscar visitas' });
  }
});

export default router;


